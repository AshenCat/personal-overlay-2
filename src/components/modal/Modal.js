import React from 'react'
import './modal.scss'

function Modal(props) {

    const wrapperRef = React.useRef(null);

    function useOutsideAlerter(ref) {
        React.useEffect(() => {
            let isMounted = true;
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    try {
                        // console.log('onClose')
                        props.onClose();
                    } catch(err) {
                        console.log('error here')
                    }
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                isMounted = false;
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideAlerter(wrapperRef);


    return (
        <div className={props.open ? "backdrop show" : "backdrop"}>
            <div className="modal" ref={wrapperRef} style={props.open ? {height: 'auto'} : {}}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal
