"use strict";

function TaskAtHandApp()
{
    var version = "v1.0";

    function setStatus(message)
    {
        $("#app>footer").text(message);
    }

    function addTask()
    {
      var taskName = $("#new-task-name").val();
      if (taskName)
      {
        addTaskElement(taskName);
        // Reset the text field
        $("#new-task-name").val("").focus();
      }
    }
    function onEditTaskName($span)
    {
      $span.hide()
        .siblings("input.task-name")
        .val($span.text())
        .show()
        .focus();
    }
    function addTaskElement(taskName)
    {
        var $task = $("#task-template .task").clone();
        $("span.task-name", $task).text(taskName);

        $("#task-list").append($task);

        $("button.delete", $task).click(function() {
            $task.remove();
        });
        $("button.move-up", $task).click(function() {
            $task.insertBefore($task.prev());
        });
        $("button.move-down", $task).click(function() {
            $task.insertAfter($task.next());
        });
        $("span.task-name", $task).click(function() {
            onEditTaskName($(this));
        });
    }

    this.start = function()
    {
        $("#new-task-name").keypress(function(e) {
          if (e.which == 13) // Enter key
          {
            addTask();
            return false;
          }
        })
        .focus();

        $("#app>header").append(version);
        setStatus("ready");
    };
}

$(function() {
    window.app = new TaskAtHandApp();
    window.app.start();
});
