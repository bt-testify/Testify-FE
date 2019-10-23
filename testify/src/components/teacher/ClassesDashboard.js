import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../actions';
import ClassViewer from '../teacher/ClassViewer';

const ClassesDashboard = props => {
  const { classes, name } = props.teacherObj;
  console.log('ClassesDashboard.js props', props);
  return (
    <div>
      <h1 className='initial'>{name}'s classes:</h1>
      <ul className='teacher-class-list'>
        {classes.map(klass => (
          <NavLink to={`/class-viewer/${name}/${klass.subject}`}>
            {klass.subject}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

const mapStateTopProps = state => {
  return {
    teacherObj: state.teacherReducer
  };
};

export default connect(
  mapStateTopProps,
  {}
)(ClassesDashboard);
