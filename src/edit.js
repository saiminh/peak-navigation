import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {

  const [ navOne, setNavOne ] = useState( attributes.navOne );
  const [ navTwo, setNavTwo ] = useState( attributes.navTwo );


  const updateNavOne = ( content, index ) => {
    let newNavOne = [ ...navOne ];
    newNavOne[ index ].content = content;
    setNavOne( newNavOne )
    setAttributes( { navOne: newNavOne } );
  }

  const updateNavTwo = ( content, index ) => {
    let newNavTwo = [ ...navTwo ];
    newNavTwo[ index ].content = content;
    setNavTwo( newNavTwo )
    setAttributes( { navTwo: newNavTwo } );
  }

  const addNavOne = () => {
    let newNavOne = [ ...navOne ];
    newNavOne.unshift( { content:'New Link' } );
    setNavOne( newNavOne );
    setAttributes( { navOne: newNavOne } );
  }
  const addNavTwo = () => {
    let newNavTwo = [ ...navTwo ];
    newNavTwo.unshift( { content:'New Link' } );
    setNavTwo( newNavTwo );
    setAttributes( { navTwo: newNavTwo } );
  }

  const removeNav = (navid, index) => {
    if (navid === 'navOne') {
      let newNavOne = navOne.filter( (navitem) => navitem != navOne[index] );
      setNavOne( newNavOne );
      setAttributes( { navOne: newNavOne } );
    }
    if (navid === 'navTwo') {
      let newNavTwo = navTwo.filter( (navitem) => navitem != navTwo[index] );
      setNavTwo( newNavTwo );
      setAttributes( { navTwo: newNavTwo } );
    }
  };

  const moveUpNav = (navid, index) => {
    if ( index === 0 ) {
      return;
    }
    if (navid === 'navOne') {
      let newNavOne = [ ...navOne ];
      let thisNav = newNavOne.splice( index, 1 )[0];
      newNavOne.splice(index-1, 0, thisNav );
      setNavOne( newNavOne );
      setAttributes( { navOne: newNavOne } );
    }
    if (navid === 'navTwo') {
      let newNavTwo = [ ...navTwo ];
      let thisNav = newNavTwo.splice( index, 1 )[0];
      newNavTwo.splice(index-1, 0, thisNav );
      setNavTwo( newNavTwo );
      setAttributes( { navTwo: newNavTwo } );
    }
  }
  const moveDownNav = (navid, index) => {
    if (navid === 'navOne') {
      if ( index === navOne.length - 1 ) {
        return;
      }
      let newNavOne = [ ...navOne ];
      let thisNav = newNavOne.splice( index, 1 )[0];
      newNavOne.splice(index+1, 0, thisNav );
      setNavOne( newNavOne );
      setAttributes( { navOne: newNavOne } );
    }
    if (navid === 'navTwo') {
      if ( index === navTwo.length - 1 ) {
        return;
      }
      let newNavTwo = [ ...navTwo ];
      let thisNav = newNavTwo.splice( index, 1 )[0];
      newNavTwo.splice(index+1, 0, thisNav );
      setNavTwo( newNavTwo );
      setAttributes( { navTwo: newNavTwo } );
    }
  }

	return (
		<div { ...useBlockProps(
      { className: 'peak-nav', id: 'top' }
    ) }>
      <a href='/' className='peak-logo-link'>
        <svg className="peak-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 102 102"><circle class="peak-logo-svg-circle" cx="50" cy="50" r="50"></circle><polygon class="peak-logo-svg-letters" points="70.45 39.19 70.45 61.48 75.19 61.48 75.19 53.82 78.47 50.48 84.61 61.48 90.66 61.48 82.14 46.79 89.65 39.19 83.69 39.19 75.19 47.68 75.19 39.19 70.45 39.19"></polygon><polygon class="peak-logo-svg-letters" points="43.83 43.41 43.83 39.22 28.98 39.22 28.98 61.48 43.83 61.48 43.83 57.29 33.71 57.29 33.71 52.23 43.2 52.23 43.2 48.03 33.71 48.03 33.71 43.41 43.83 43.41"></polygon><path class="peak-logo-svg-letters" d="M45.77,61.48h5.12L51.48,60a3,3,0,0,1,.16-.36,6,6,0,0,1,11-.21,2.92,2.92,0,0,1,.14.31l.7,1.78h5.15l-8.9-22.26h-5Zm13.95-9.63a10.56,10.56,0,0,0-2.53-.31,9.85,9.85,0,0,0-2.55.33l2.56-6.52Z"></path><path class="peak-logo-svg-letters" d="M9.34,39.22V61.48h4.73V53.57h3.4c5.56,0,9-2.71,9-7.18s-3.46-7.17-9-7.17Zm12.29,7.17c0,1.91-1.48,3-4.16,3h-3.4v-6h3.4C20.15,43.41,21.63,44.49,21.63,46.39Z"></path></svg>
      </a>
      
      <div className='nav-container'>
        <div className='navOne'>
          <ul className='navList'>
            <li className='navOne-navList-home'><a href="/">Home</a></li>
            { attributes.navOne.map( ( navitem, index ) => {
              return(
                <li>
                  <RichText
                    key={index}
                    value={ navitem.content }
                    onChange={ ( newcontent ) => updateNavOne(newcontent, index) }
                  />
                  <div className='ui-buttons'>
                    { index != 0 && 
                      <Button className='moveup-nav-link' onClick={ () => moveUpNav('navOne', index) }>Up</Button>}
                    { index < navOne.length - 1 && 
                      <Button className='movedown-nav-link' onClick={ () => moveDownNav('navOne', index) }>Down</Button>}
                      <Button className='remove-nav-link' onClick={ () => removeNav('navOne', index) }>Remove</Button>
                  </div>
                </li>
              )
            }) }
          </ul>
          <Button className="add-nav-link" onClick={ addNavOne }>
            Add Navigation Link
          </Button>
        </div>

        <div className='navTwo'>
          <ul className='navList'>
            { attributes.navTwo.map( ( navitem, index ) => {
              return(
                <li>
                  <RichText
                    key={index}
                    value={ navitem.content }
                    onChange={ ( newcontent ) => updateNavTwo(newcontent, index) }
                  />
                  <div className='ui-buttons'>
                    { index != 0 && <Button className='moveup-nav-link' onClick={ () => moveUpNav('navTwo', index) }>Up</Button>}
                    { index < navTwo.length - 1 && <Button className='movedown-nav-link' onClick={ () => moveDownNav('navTwo', index) }>Down</Button>}
                    <Button className='remove-nav-link' onClick={ () => removeNav('navTwo', index) }>
                      Remove
                    </Button>
                  </div>
                </li>
              )
            }) }
          </ul>
          <Button className="add-nav-link" onClick={ addNavTwo }>
            Add Navigation Link
          </Button>
        </div>
      </div>
		</div>
	);
}
