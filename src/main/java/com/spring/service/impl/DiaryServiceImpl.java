package com.spring.service.impl;

import com.spring.entity.DiaryDO;
import com.spring.mapper.DiaryMapper;
import com.spring.service.DiaryService;
import com.spring.service.ImageService;
import com.spring.util.DateTimeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("diaryService")
public class DiaryServiceImpl implements DiaryService {

    private Logger logger = LoggerFactory.getLogger(DiaryServiceImpl.class);

    @Autowired
    private DiaryMapper diaryMapper;

    @Autowired
    private DateTimeUtil dateTimeUtil;

    @Override
    public List<DiaryDO> readDiaryListByUserId(int userId) {
        return diaryMapper.selectDiaryListByUserId(userId);
    }

    @Override
    public DiaryDO readDiaryByDiaryName(String diaryName) {
        return diaryMapper.selectDiaryByDiaryName(diaryName);
    }

    @Override
    public void createDiary(DiaryDO diaryDO) {
        String create, modified;
        create = modified = dateTimeUtil.getCurrentTime();
        diaryDO.setdiaryGmtCreate(create);
        diaryDO.setdiaryGmtModified(modified);
        diaryMapper.insertDiary(diaryDO);
    }

    @Override
    public void updateDiary(DiaryDO diaryDO) {
        String modified = dateTimeUtil.getCurrentTime();
        diaryDO.setdiaryGmtModified(modified);
        diaryMapper.updateDiary(diaryDO);
    }

    @Override
    public void deleteDiaryById(int diaryId) {
        diaryMapper.deleteDiaryById(diaryId);
    }
}
