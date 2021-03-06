package com.hust.bigdataplatform.service.impl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.bigdataplatform.dao.TeacherDao;
import com.hust.bigdataplatform.model.Teacher;
import com.hust.bigdataplatform.service.TeacherService;
/**
 * 
 * @author niannian
 *
 */
@Service
public class TeacherServiceImpl implements TeacherService {
	
	private static final Logger logger = LoggerFactory.getLogger(TeacherServiceImpl.class);
	
	@Autowired
	private TeacherDao teacherdao;

	//验证教师登陆；若返回0，则不存在该用户；若返回1，密码错误；若返回2,登陆成果
	@Override
	public int TeacherLogin(String teacherid, String teacherpwd) {
		// TODO Auto-generated method stub
	
		Teacher teacher = teacherdao.findById(teacherid);
		if (teacher == null) {
			return 0;
		}
		else if (teacher.getTeacherPwd().equals(teacherpwd)) {
			return 2;
		}
		else {
			return 1;
		}
	}
	//根据ID查找教师
	@Override
	public Teacher findById(String teacherId) {
		if (teacherId.equals(null)) {
			return null;
		}
		else
		{
			return teacherdao.findById(teacherId);
		}
	}

}
