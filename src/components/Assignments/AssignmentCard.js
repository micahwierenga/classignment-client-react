import React from 'react';
import { useState } from 'react';
import CourseModel from '../../models/CourseModel';

const AssignmentCard = props => {
    const [showSubmission, setShowSubmission] = useState(false);
    const [submission, setSubmission] = useState({});
    const [postedDate, setPostedDate] = useState(null);
    const [completedCheck, setCompletedCheck] = useState(false);

    const { id, description, due_at, html_url, name, points_possible, course_id, assignment_group_id, can_access } = props.assignment;

    const dueDate = due_at ? new Date(due_at) : null;
    
    const toggleSubmission = () => {
        if(!Object.keys(submission).length && can_access) {
            fetchSubmission()
        } else {
            setShowSubmission(!showSubmission);
        }
    }
    
    const fetchSubmission = async () => {
        const fetchedSubmission = await CourseModel.getSubmission(course_id, id);
        setSubmission(fetchedSubmission.submission);
        const pDate = new Date(fetchedSubmission.submission.posted_at);

        setPostedDate(pDate);
        setShowSubmission(!showSubmission);
    }

    const markComplete = async () => {
        const res = await CourseModel.markComplete(id);
        if(res.updatedAssignment.assignmentId === id) props.getAssignments(props.selectedCourse, true);
    }

    return (
        <div className={`assignment-card ${props.dayColor === 'gold' ? 'gold-day-assignment' : 'blue-day-assignment'}`}>
            <p className="assignment-name"><a href={html_url.replace('canvas', 'stem')} target="_blank" rel="noreferrer">{name}</a></p>
            {
                showSubmission && can_access ?
                <div className="assignment-info-container show-info gray-border" onClick={() => toggleSubmission()}>
                    <p>{postedDate ? `Submitted on: ${postedDate.toDateString().substring(0, 3)}, ${postedDate.toDateString().substring(4)}` : 'Not submitted yet'}</p>
                    <p>Grade: {submission.entered_score}/{points_possible}</p>
                </div>
                :
                <div className="assignment-info-container" onClick={() => toggleSubmission()}>
                    {/* <p dangerouslySetInnerHTML={{__html: description}} /> */}
                    <p>{dueDate ? `Due: ${dueDate.toDateString().substring(0, 3)}, ${dueDate.toDateString().substring(4)}` : 'No due date yet'}</p>
                    <p>{points_possible ? `Points: ${points_possible}` : ''}</p>
                    {showSubmission && !can_access ? 'Not authorized' : ''}
                </div>
            }
            <div className="completed-button-container">
                {!completedCheck ?
                <button className="completed-button" onClick={() => setCompletedCheck(true)}>COMPLETED</button>
                :
                <>
                <div className="confirmation-buttons-container">
                    <div className="confirmation-message">MARK COMPLETE?</div>
                    <button className="completed-check-button confirm-button" onClick={markComplete}>YES</button>
                    <button className="completed-check-button cancel-button" onClick={() => setCompletedCheck(false)}>CANCEL</button>
                </div>
                </>
                }
            </div>
        </div>
    );
}

export default AssignmentCard;