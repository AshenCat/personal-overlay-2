import React from 'react'
import Card from '../../../components/card/Card'
import './sprints.scss'

function Sprints(props) {
    console.log(props.location)
    return (
        <div className="sprints">
            <div className="sprint-filter-and-settings">
                <Card className="sprint-filter" noButton>
                    <h4 className="card-title">Sprints Filter</h4>
                </Card>
                <Card className="sprint-menu" noButton>
                    <h4 className="card-title">Sprints </h4>
                </Card>
            </div>
            <div className="sprints-container">
                {[...new Array(10)].map((_, ctr) => {
                    return <Card key={ctr} className="sprint">
                        Title: asd
                    </Card>
                })}
            </div>
        </div>
    )
}

export default Sprints
