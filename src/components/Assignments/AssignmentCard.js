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
            <div className="assignment-name"><a href={html_url.replace('canvas', 'stem')} target="_blank" rel="noreferrer">{name}</a></div>
            {
                showSubmission && can_access ?
                <div className="assignment-info-container show-info" onClick={() => toggleSubmission()}>
                    <div className="assignment-info-groups">
                        <div className="assignment-info-group">
                            <div className="assignment-subheading">SUBMITTED</div>
                            <div>{postedDate ? <><div>{postedDate.toDateString().substring(0, 3)}</div><div>{postedDate.toDateString().substring(4)}</div></> : 'Not submitted yet'}</div>
                        </div>
                        <div className="assignment-info-group">
                            <div className="assignment-subheading">GRADE</div>
                            <div>{submission.entered_score ? `${submission.entered_score}/${points_possible}` : 'Not graded yet'}</div>
                        </div>
                    </div>
                    {showSubmission && submission.submission_comments.length > 0 ? <div className="feedback-message has-feedback">Check out the feedback</div> : <div className="feedback-message">You have no feedback</div> }
                </div>
                :
                <div className="assignment-info-container" onClick={() => toggleSubmission()}>
                    {/* <p dangerouslySetInnerHTML={{__html: description}} /> */}
                    <div className="assignment-info-group">
                        <div>{dueDate ? <><div className="assignment-info">{dueDate.toDateString().substring(0, 3)}</div><div>{dueDate.toDateString().substring(4)}</div></> : 'No due date yet'}</div>
                    </div>
                    <div className="assignment-info-group">
                        <div className="assignment-info">{points_possible ? points_possible : ''}</div>
                        <div>points</div>
                    </div>
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
                {can_access === 'No group found' ? <p className="assignment-group-error">Tell your handsome father that assignment group <strong>{assignment_group_id}</strong> is not in the system yet.</p> : null}
            </div>
        </div>
    );
}

export default AssignmentCard;