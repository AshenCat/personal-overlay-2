import React from 'react'
import './modal.scss'

function Modal(props) {

    const wrapperRef = React.useRef(null);

    function useOutsideAlerter(ref) {
        React.useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    try {
                        props.setEventModalOpen(false);
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


    return (
        <div className={props.open ? "backdrop show" : "backdrop"}>
            <div className="modal" ref={wrapperRef}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal
