'use strict';
let accessor = require("../data/object_accessors");
let moment = require("moment");

module.exports = {
    saveRequest
};

function saveRequest(req, res){
    let isNew = req.swagger.params.isNew.value;
    let requestDetail = req.swagger.params.requestDetails.value;
    let accessorFunction = null;
    const requestRecord = {
        "request_date": moment(new Date(requestDetail.request_date)).format("YYYY-MM-DD hh:mm:ss"),
        "yoe": requestDetail.yoe,
        "location": requestDetail.location,
        "start_date": moment(new Date(requestDetail.start_date)).format("YYYY-MM-DD hh:mm:ss"),
        "status": requestDetail.status,
        "end_date": moment(new Date(requestDetail.end_date)).format("YYYY-MM-DD hh:mm:ss"),
        "primary_skill": requestDetail.primary_skill,
        "secondary_skill": requestDetail.secondary_skill || '',
        "resource_type": requestDetail.resource_type,
        "hr_notes": requestDetail.hr_notes || '',
        "hiring_mgr_notes": requestDetail.hiring_mgr_notes || '',
        "project": requestDetail.project,
        "sys_created_by": requestDetail.creatorId,
        "sys_updated_by": requestDetail.creatorId,
        "sys_updated_on": moment().format("YYYY-MM-DD hh:mm:ss"),
        "sys_created_on": moment(new Date(requestDetail.request_date)).format("YYYY-MM-DD hh:mm:ss")
    };
    if(isNew) {
        requestRecord['sys_id'] = new Date().getTime();
        requestRecord.number = `DET${new Date().getTime()}`;
        accessorFunction = accessor.insertData("request_detail", requestRecord);
    } else {
        requestRecord['sys_id'] = requestDetail.request_id;
        delete(requestRecord.number);
        accessorFunction = accessor.updateData("request_detail", requestRecord, 'sys_id');
    }
    accessorFunction
    .then(async (requestSaveStatus) => {
        if(!isNew) {
            res.send(requestSaveStatus);
        } else {
            // Get all vendor managers from user table
            // Then create a task for each one of them
            let verndorManagers = await accessor.getData('user', [{fieldname: 'roles', mode: 'eq', values: ['vendor-manager']}]);
            let taskCreationArray = [];
            let taskIds = [];
            verndorManagers.forEach(vm => {
                let vmTask = {
                    "Task_id": Math.floor(Math.random() * 1000000000),
                    "Start_date": moment(new Date(requestDetail.start_date)).format("YYYY-MM-DD hh:mm:ss"),
                    "Due_date": moment(new Date(requestDetail.end_date)).format("YYYY-MM-DD hh:mm:ss"),
                    "Assigned_date": moment().format("YYYY-MM-DD hh:mm:ss"),
                    "Assignee": vm.sys_id,
                    "Created": moment().format("YYYY-MM-DD hh:mm:ss"),
                    "Created": moment().format("YYYY-MM-DD hh:mm:ss"),
                    "entity_type": "Random value",
                    "entity_Id": "EntXX57689X"
                }
                taskIds.push(vmTask.Task_id);
                taskCreationArray.push(accessor.insertData("task", vmTask));
            });
            Promise.all(taskCreationArray).then(tasks => {
                let taskMessage = `The request ${requestRecord.number} was created and the following tasks were associated with it: `;
                taskIds.forEach(taskId => {
                    taskMessage = `${taskMessage} ${taskId},`;
                });
                taskMessage = taskMessage.substr(0, taskMessage.length-1);
                res.send({message: taskMessage});
            }).catch(err => {
                res.status(500).send({
                    message: `The request ${requestRecord.number} was created but there were errors in creating associated tasks.`,
                    errorMessage: err.sqlMessage || err.message
                });
            });
        }
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
}
