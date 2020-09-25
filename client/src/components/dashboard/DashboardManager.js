import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import CourseItemss from '../courses/CourseItemss';

import { getCourses } from '../../actions/courseActions';

const DashboardManager = ({ getCourses, course: { courses, loading } }) => {
  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='profileTitel'> Courses</h1>

          <div className='profilesflex'>
            {courses.length > 0 ? (
              courses.map(course => (
                <CourseItemss key={course._id} course={course} />
              ))
            ) : (
              <h4> No Course found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

CourseItemss.propTypes = {
    getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  course: state.course
});

export default connect(mapStateToProps, { getCourses })(DashboardManager);