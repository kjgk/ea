package com.withub.web.controller.ea;


import com.withub.common.util.CollectionUtil;
import com.withub.common.util.DateUtil;
import com.withub.model.ea.Task;
import com.withub.model.ea.TaskRemind;
import com.withub.service.ea.TaskService;
import com.withub.util.SpringSecurityUtil;
import com.withub.web.common.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/ea/task")
public class TaskController extends BaseController {

    //============================ 属性声明 ==============================================================

    @Autowired
    private TaskService taskService;

    //============================ Controller 方法 =======================================================

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public void createTask(ModelMap modelMap, Task task) throws Exception {

        task.setCreator(SpringSecurityUtil.getCurrentUser());
        taskService.createTask(task);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void updateTask(ModelMap modelMap, Task task) {

        taskService.updateTask(task);
    }

    @RequestMapping(value = "/load/{objectId}", method = RequestMethod.GET)
    public void loadTask(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) {

        Task task = taskService.getTaskById(objectId);
        Map data = new HashMap();
        data.put("objectId", task.getObjectId());
        data.put("title", task.getTitle());
        data.put("startTime", DateUtil.getStandardMinuteString(task.getStartTime()));
        data.put("repeat", task.getRepeat());
        data.put("scope", task.getScope());
        data.put("content", task.getContent());
        modelMap.put("data", data);
    }

    @RequestMapping(value = "/delete/{objectId}", method = RequestMethod.GET)
    public void deleteTask(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) {

        taskService.deleteTask(objectId);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public void batchDeleteTask(ModelMap modelMap, @RequestParam String objectIds) {

        taskService.deleteTask(objectIds.split(","));
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public void listTask(ModelMap modelMap) throws Exception {

        List<Task> list = taskService.listByUserId(SpringSecurityUtil.getUserId());
        List items = new ArrayList();

        for (Task task : list) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", task.getObjectId());
            item.put("title", task.getTitle());
            item.put("startTime", DateUtil.getDateFormatString(task.getStartTime(), "yyyy年MM月dd日"));
            item.put("repeat", task.getRepeat());
            item.put("scope", task.getScope());
            item.put("status", task.getStatus());
            item.put("remindStatus", task.getRemindStatus());
            items.add(item);
        }
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/listTaskRemind", method = RequestMethod.GET)
    public void listTaskRemind(ModelMap modelMap) throws Exception {

        List<TaskRemind> list = taskService.listTaskRemind(SpringSecurityUtil.getUserId());
        List items = new ArrayList();

        if(CollectionUtil.isNotEmpty(list)) {
            for (TaskRemind taskRemind : list) {
                Task task = taskRemind.getTask();
                HashMap<String, Object> item = new HashMap<String, Object>();
                item.put("taskRemindId", taskRemind.getObjectId());
                item.put("title", task.getTitle());
                item.put("content", task.getContent());
                items.add(item);
            }
        }
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/updateTaskRemind", method = RequestMethod.POST)
    public void updateTaskRemind(ModelMap modelMap, @RequestParam String taskRemindId) throws Exception {

        taskService.updateTaskRemind(taskRemindId);
    }

    //============================ 属性方法 ==============================================================

    public TaskService getTaskService() {

        return taskService;
    }

    public void setTaskService(TaskService taskService) {

        this.taskService = taskService;
    }
}
