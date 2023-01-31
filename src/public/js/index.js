const socket = io();

const swal = async () => {
    const chatBox = document.getElementById("chatBox");

    const result = await Swal.fire({
        title: "Identificate",
        input: "text",
        text: "Ingresa el usuario para identificarse en el chat",
        inputValidator: (value) => {
            return !value && 'Necesitas escribir un nombre de usuario para continuar!' 
        },
        allowOutsideClick: false
    })
        
    const user = result.value;

    socket.emit('retrieveLog');
    socket.emit('userConnected', user);

    chatBox.addEventListener('keyup', evt => {
        if(evt.key === "Enter") {
            if(chatBox.value.trim().length > 0) {
                socket.emit("message", {user: user, message: chatBox.value});
                chatBox.value = "";
            }
        }
    })
    
    socket.on('messageLogs', data => {
        let log = document.getElementById("messageLogs");
        let messages = "";
        data.forEach(message => {
            messages = messages + `${message.user} dice: ${message.message} </br> `
        });
        log.innerHTML = messages;
    })
    
    socket.on("sendLog", data => {
        let log = document.getElementById("messageLogs");
        let messages = "";
        data.forEach(message => {
            messages = messages + `${message.user} dice: ${message.message} </br> `
        });
        log.innerHTML = messages;
    })
    
    socket.on('showNotification', data => {
        Swal.fire({
            text: `${data} se ha conectado al chat `,
            toast: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            icon: "success"
        })
    })   
}

swal();



