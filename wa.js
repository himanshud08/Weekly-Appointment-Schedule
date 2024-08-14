document.addEventListener('DOMContentLoaded', function () {
    let draggedAppointment = null;

    // Create a new appointment
    function createAppointment(text) {
        const appointment = document.createElement('div');
        appointment.className = 'appointment';
        appointment.textContent = text;

        // Make the appointment draggable
        appointment.draggable = true;

        appointment.addEventListener('dragstart', function (e) {
            draggedAppointment = appointment;
        });

        appointment.addEventListener('dblclick', function () {
            if (confirm('Delete this appointment?')) {
                appointment.remove();
                updateSummary();
            }
        });

        return appointment;
    }

    // Handle dragover event
    document.querySelectorAll('.day-column').forEach(day => {
        day.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        day.addEventListener('drop', function (e) {
            if (draggedAppointment) {
                day.appendChild(draggedAppointment);
                draggedAppointment = null;
                updateSummary();
            }
        });

        // Allow adding appointments via double-click
        day.addEventListener('dblclick', function () {
            const appointmentText = prompt('Enter appointment details:');
            if (appointmentText) {
                const appointment = createAppointment(appointmentText);
                day.appendChild(appointment);
                updateSummary();
            }
        });
    });

    // Update the summary of appointments
    function updateSummary() {
        const summaryList = document.getElementById('appointmentList');
        summaryList.innerHTML = '';

        document.querySelectorAll('.day-column').forEach(day => {
            const dayAppointments = day.querySelectorAll('.appointment');
            dayAppointments.forEach(appointment => {
                const listItem = document.createElement('li');
                listItem.textContent = `${day.id.charAt(0).toUpperCase() + day.id.slice(1)}: ${appointment.textContent}`;
                summaryList.appendChild(listItem);
            });
        });
    }

    // Handle summary modal
    const modal = document.getElementById('summaryModal');
    const viewSummaryButton = document.getElementById('viewSummary');
    const closeButton = document.getElementsByClassName('close')[0];

    viewSummaryButton.addEventListener('click', function () {
        updateSummary();
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
