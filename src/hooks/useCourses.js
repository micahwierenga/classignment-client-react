import { useState, useEffect } from 'react';
import CourseModel from '../models/CourseModel';

const useCourses = courseId => {
  const [courses, setCourse] = useState([]);

  const fetchCourses = id => {
    if (id) {
      CourseModel.show(id).then(data => setCourse(data.course));
    } else {
      CourseModel.all().then(data => setCourse(data.courses));
    }
  }

  useEffect(
    function () {
      fetchCourses(courseId);
    },
    [courseId]
  );

  return [courses, fetchCourses];
}

export default useCourses;