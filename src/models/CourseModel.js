const URL = "http://localhost:5000/api/v1/courses";

const handleResponse = res => res.status === 200 ? res.json() : { message: 'No data' };

class CourseModel {
  static all = () => {
    return fetch(URL).then(response => handleResponse(response));
  };

  static getAssignments = (courseId) => {
    return fetch(`${URL}/${courseId}`).then(response => {
        return handleResponse(response);
    });
  };
  
  static getSubmission = (courseId, assignmentId) => {
    return fetch(`${URL}/${courseId}/${assignmentId}`).then(response => {
        return handleResponse(response);
    });
  };

  static markComplete = assignmentId => {
    return fetch(`${URL}/${assignmentId}`, {
      method: 'PUT',
    }).then(response => handleResponse(response));
  }
}

export default CourseModel;