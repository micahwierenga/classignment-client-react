import React from 'react';
import AssignmentCard from './AssignmentCard';

import './Assignments.css'

const semesterStart = new Date('January 5, 2021');

const AssignmentShow = props => {
    const { assignments, dayColor, getAssignments } = props;
    const today = new Date();

    const generateAssignmentCards = assignments => assignments.map((a, i) => {
        const assignment = a;
        const dueDate = new Date(assignment.due_at);

        return !assignment.locked_for_user || (dueDate < today && dueDate > semesterStart) ? <AssignmentCard key={`${assignment.id}${i}`} assignment={assignment} dayColor={dayColor} selectedCourse={props.selectedCourse} getAssignments={getAssignments} /> : null;
    })

    return assignments.length ?
    <div className="assignments-cards-container">
        {generateAssignmentCards(assignments)}
    </div> : <h3>Loading...</h3>;
}

export default AssignmentShow;