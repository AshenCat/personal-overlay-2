import { ArrowBack, EventNote, Home, PostAdd } from '@material-ui/icons'
import React from 'react'
import { withRouter } from 'react-router-dom';
import './drawer.scss'

function Drawer(props) {
    const [selected, setSelected] = React.useState('home')
    const fontSize=40;

    let {location} = props

    const onSelect = (id) => {
        document.getElementById(selected)?.classList.remove('active');
        document.getElementById(id)?.classList.add('active');
        props.history.push(id === 'home' ? '/' : id);
        setSelected(id);   
    }

    const onBack = () => {
        props.history.goBack()
        document.getElementById(selected)?.classList.remove('active');
    }
    React.useState(()=>{
        console.log(location?.pathname?.substring(1))
        onSelect(location?.pathname?.substring(1) === '' ? 'home' : location?.pathname?.substring(1))
    }, [location])

    return (
        <aside className="drawer">
            <ul>
                <li className="ul-last">
                    <figure className="figure white flex-col" onClick={onBack}>
                        <span className="logo circle-border"><ArrowBack style={{fontSize: fontSize}} /></span>
                        {/* <figcaption>Back</figcaption> */}
                    </figure>
                </li>
            </ul>
            <ul>
                <li>
                    <figure className="figure" id="home" onClick={()=>onSelect('home')}>
                        <span className="logo"><Home style={{fontSize: fontSize}} /></span>
                        {/* <figcaption>Todo</figcaption> */}
                    </figure>
                </li>
                <li>
                    <figure className="figure" id="events" onClick={()=>onSelect('events')}>
                        <span className="logo"><EventNote style={{fontSize: fontSize}} /></span>
                        {/* <figcaption>Todo</figcaption> */}
                    </figure>
                </li>
                <li>
                    <figure className="figure" id="sprints" onClick={()=>onSelect('sprints')}>
                        <span className="logo"><PostAdd style={{fontSize: fontSize}} /></span>
                        {/* <figcaption>Todo</figcaption> */}
                    </figure>
                </li>
            </ul>
        </aside>
    )
}

export default withRouter(Drawer)
