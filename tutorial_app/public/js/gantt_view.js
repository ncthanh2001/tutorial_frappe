frappe.ui.form.on('Task', {
    refresh: function(frm) {
        // Add Gantt view button
        frm.add_custom_button(__('Gantt View'), function() {
            show_gantt_view(frm);
        });
    }
});

function show_gantt_view(frm) {
    // Create dialog
    let d = new frappe.ui.Dialog({
        title: __('Task Gantt View'),
        size: 'large',
        fields: [
            {
                fieldname: 'gantt_container',
                fieldtype: 'HTML',
                options: '<div id="gantt"></div>'
            }
        ],
        primary_action_label: __('Close'),
        primary_action: function() {
            d.hide();
        }
    });

    d.show();

    // Initialize Gantt chart
    const tasks = get_tasks_for_gantt(frm);
    const gantt = new Gantt('#gantt', tasks, {
        header_height: 50,
        column_width: 30,
        step: 24,
        view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month', 'Year'],
        bar_height: 20,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_mode: 'Day',
        date_format: 'YYYY-MM-DD',
        language: 'en',
        custom_popup_html: function(task) {
            return `
                <div class="gantt-popup">
                    <h3>${task.name}</h3>
                    <p>Start: ${task.start}</p>
                    <p>End: ${task.end}</p>
                    <p>Progress: ${task.progress}%</p>
                </div>
            `;
        }
    });
}

function get_tasks_for_gantt(frm) {
    // Get all tasks for the current project
    return frappe.call({
        method: 'tutorial_app.tutorial_app.doctype.task.task.get_tasks_for_gantt',
        args: {
            'project': frm.doc.project
        },
        callback: function(r) {
            if (r.message) {
                return r.message.map(task => ({
                    id: task.name,
                    name: task.subject,
                    start: task.start_date,
                    end: task.end_date,
                    progress: task.progress || 0,
                    dependencies: task.depends_on || '',
                    custom_class: task.status.toLowerCase()
                }));
            }
        }
    });
} 