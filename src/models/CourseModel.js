const URL = `${process.env.REACT_APP_API}/courses`;

const handleResponse = res => res.status === 200 ? res.json() : { message: 'No data' };

class CourseModel {
  static all = () => {
    return fetch(URL, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.uid}`,
      },
    }).then(response => handleResponse(response));
  };

  static getAssignments = courseId => {
    return fetch(`${URL}/${courseId}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.uid}`,
      },
    }).then(response => {
        return handleResponse(response);
    });
  };
  
  static getSubmission = (courseId, assignmentId) => {
    return fetch(`${URL}/${courseId}/${assignmentId}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.uid}`,
      },
    }).then(response => {
        return handleResponse(response);
    });
  };

  static markComplete = assignmentId => {
    return fetch(`${URL}/${assignmentId}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.uid}`,
      },
    }).then(response => handleResponse(response));
  }
}

export default CourseModel;