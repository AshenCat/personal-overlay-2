import React from 'react'
import './clickmenu.scss'

function ClickMenu(props) {
    const wrapperRef = React.useRef(null);

    function useOutsideAlerter(ref) {
        React.useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    try {
                        props.setOpenClickMenu(false);
                    } catch(err) {
                        console.log('no error here')
                    }
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideAlerter(wrapperRef);

    const style = {
        ...props.style,
        top: props.y,
        left: props.x
    }

    return (
        <div 
            ref={wrapperRef}
            className={`clickmenu ${props.openClickMenu ? 'clickmenu-open' : ''}`}
            style={style}>
            <h5 className="clickmenu-head">{props.title}</h5>
            <menu className="clickmenu-menu">
                {props.children}
            </menu>
        </div>
    )
}

export default ClickMenu
