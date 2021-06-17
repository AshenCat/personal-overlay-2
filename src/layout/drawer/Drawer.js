import { ArrowBack, EventNote, Home, PostAdd, Reorder } from '@material-ui/icons'
import React from 'react'
import { withRouter } from 'react-router-dom';
import './drawer.scss'

function Drawer(props) {
    const [selected, setSelected] = React.useState('home')
    const fontSize=40;

    let {location} = props

    const onSelect = (id, multi) => {
        let cs = multi ? id[0] : id

        document.getElementById(selected)?.classList.remove('active');
        document.getElementById(cs)?.classList.add('active');
        
        if (multi) {
            // console.log('pushing to ', `/${id.join('/')}`)
            props.history.push( `/${id.join('/')}`);
        }
        else {
            // console.log('pushing to ', `/${id}`)
            props.history.push(id === 'home' ? '/' : `/${id}`);
        }
        setSelected(id);   
    }

    const onBack = () => {
        props.history.goBack()
        document.getElementById(selected)?.classList.remove('active');
    }
    React.useState(()=>{
        const loc = location?.pathname?.split('/').slice(-2)
        // .join('/')
        let path, multi = false;
        if (loc[0] === "") {
            if (loc[1] === "") path = 'home'
            else path = loc[1]
        }
        else {
            multi = true;
            path = loc
        }
        // console.log(location)
        // console.log(loc)
        // onSelect(location?.pathname?.substring(1) === '' ? 'home' : location?.pathname?.substring(1))
        onSelect(path, multi)
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
                    <figure className="figure" id="todos" onClick={()=>onSelect('todos')}>
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
                <li>
                    <figure className="figure" id="events" onClick={()=>onSelect('events')}>
                        <span className="logo"><Reorder style={{fontSize: fontSize}} /></span>
                        {/* <figcaption>Todo</figcaption> */}
                    </figure>
                </li>
            </ul>
        </aside>
    )
}

export default withRouter(Drawer)
