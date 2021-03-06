package com.hust.bigdataplatform.service;

import java.util.List;

import com.hust.bigdataplatform.model.Course;
import com.hust.bigdataplatform.model.Student;
import com.hust.bigdataplatform.model.StudentCourse;
import com.hust.bigdataplatform.model.params.StudentAndGroup;


public interface StudentCourseService {
	
	/**
	 * 查找学生所选课程
	 * @param studentId
	 * @return
	 */
	public List<Course> selectCoursesByStudent(String studentId);
	
	/**
	 * 查找学生所选所有课程 及成绩
	 * @param studentId
	 * @return
	 */
	public List<StudentCourse> findStudentCourseByStuId(String studentId);
	
	/**
	 * 查找学生某门课程成绩
	 * @param studentId
	 * @param courseId
	 * @return
	 */
	public int update(StudentCourse studentCourse);
	
	public StudentCourse findStudentCourseByStuId(String studentId, String courseId);
	
	public int getFinalUsualScore(String studentId, String courseId);
	
	public List<Student> findBycourseId(String courseId);
	
	public int insert(List<StudentAndGroup> StudentAndGroups, String courseId);

	public List findGroupIdList(String courseId);
		
}
