// Custom validation script
function validateForm() {
    const form = document.getElementById('orderForm');

    if (form.checkValidity() === false) {
        // If the form is invalid, show validation errors
        form.classList.add('was-validated');
        return false; // Prevent form submission
    }
    // Form is valid, proceed with submission
    sendMail(); // Assuming sendMail() is the function to handle email sending
    return false; // Prevent default form submission (as sendMail will handle it)
}

function sendMail() {
    
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Construct the email body
    const emailBody = `
        New Card Order Details:

        Order Type: ${data.orderType}
        Card Number: ${data.cardNumber}
        Card Name/Type: ${data.cardName}
        Quantity: ${data.quantity}
        
        Customer Name: ${data.customerName}
        Email: ${data.customerEmail}
        Phone Number: ${data.customerPhone}
        Order Location: ${data.orderLocation}
        
        Additional Notes: ${data.additionalNotes || 'N/A'}
    `;

    // Send email via EmailJS
    emailjs.send('service_g1v3izr', 'template_x7n887s', {
        to_email: 'surendra.bem@gmail.com', // Replace with your email address
        reply_to: data.customerEmail,
        subject: 'New Booking Request',
        message: emailBody
    })
        .then(response => {
            console.log('Email sent successfully:', response);
            alert('Your Booking request has been sent successfully.');
            
        })
        .catch(error => {
            console.error('Error sending email:', error);
            alert('There was an error sending your request. Please try again.');
        });
}

