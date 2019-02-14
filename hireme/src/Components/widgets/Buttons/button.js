import React from 'react';
import { Link } from 'react-router-dom';
import style from './button.css';


const buttons = (props) => {

   let tempelate = null;

   switch (props.type) {
       case ('loadmore'):
            tempelate = (
                <div className={style.blue_btn} onClick={props.loadMore}>
                {props.cta}
                </div>
            );
           break;
    case ('linkTo'):
            tempelate = (
               <Link to={props.linkTo} className={style.blue_btn} >
                {props.cta}
               </Link>
            );
           break;
       default:
        tempelate = null;
           break;
   }

   return tempelate;
}

export default buttons;


