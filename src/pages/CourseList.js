import React from 'react';
import Courses from '../components/Courses/Courses';
import useCourses from '../hooks/useCourses';

const CourseList = props => {
  const [courses, fetchCourses] = useCourses();

  return (
    <div>
      {courses.length ? <Courses courses={courses} /> : <h1>Loading...</h1>}
    </div>
  );
}

export default CourseList;