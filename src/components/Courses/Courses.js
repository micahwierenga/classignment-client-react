import React from 'react';
import { useState, useEffect } from 'react';
import CourseModel from '../../models/CourseModel';
import CourseCard from './CourseCard';
import AssignmentShow from '../Assignments/AssignmentShow';

import './Courses.css';

const Courses = props => {
    const [assignments, setAssignments] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState({});

    const generateBlueCourseCards = courses => courses.map(course => course.day_color === 'blue' ? <CourseCard key={course.uuid} course={course} getAssignments={getCourseAssignments} /> : '')
    const generateGoldCourseCards = courses => courses.map(course => course.day_color === 'gold' ? <CourseCard key={course.uuid} course={course} getAssignments={getCourseAssignments} /> : '')

    const [showDetails, setShowDetails] = useState(false);
    const [dayColor, setDayColor] = useState('');

    useEffect(() => {})

    const getCourseAssignments = async (courseObj, reload) => {
        if(!reload && courseObj && selectedCourse.api_id === courseObj.api_id) {
            setShowDetails(!showDetails);
        } else {
            setSelectedCourse(courseObj);
            const fetchedAssignments = await CourseModel.getAssignments(courseObj.api_id);

            setAssignments(fetchedAssignments.fullAssignments);
            setDayColor(courseObj.day_color);
            setShowDetails(true);
        }
    }

    return (
        <>
        <div className='courses-container'>
            <div className='blue-courses'>
                {generateBlueCourseCards(props.courses)}
            </div>
            <div className='gold-courses'>
                {generateGoldCourseCards(props.courses)}
            </div>
        </div>
        {showDetails ? <AssignmentShow assignments={assignments} dayColor={dayColor} selectedCourse={selectedCourse} getAssignments={getCourseAssignments} /> : null}
        </>
    )
}

export default Courses;