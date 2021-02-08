import React from 'react';

const CourseCard = props => {
    const { short_name, instructor_title, instructor_first_name, instructor_last_name, day_color, period, office_hours, office_hours_zoom_link, class_zoom_link, instructor_email, has_assignments } = props.course;

    const shortNameDivs = short_name.split('').map((letter, i) => <div key={i}>{letter.toUpperCase()}</div>)

    return (
        <div onClick={() => has_assignments ? props.getAssignments(props.course) : null} className={`course-card ${day_color === 'gold' ? 'gold-day' : 'blue-day'}`}>
            <div className="course-title">
                {shortNameDivs}
            </div>
            <div className="course-info">
                {class_zoom_link ? <div className="period"><a href={class_zoom_link}>Period {period}</a></div> : <div className="period">Period {period}</div>}
                <div><a href={`mailto:${instructor_email}`}>{instructor_title ? `${instructor_title} ` : ''}{instructor_first_name} {instructor_last_name}</a></div>
                {office_hours_zoom_link ? <div><a href={office_hours_zoom_link}>{office_hours}</a></div> : <div>{office_hours}</div>}
            </div>
        </div>
    )
}

export default CourseCard;