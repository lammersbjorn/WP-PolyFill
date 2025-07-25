// Alert box design by Igor Ferrão de Souza: https://www.linkedin.com/in/igor-ferr%C3%A3o-de-souza-4122407b/

const cuteAlert = ({
    type,
    title,
    message,
    img = "assets/images/icons",
    buttonText = 'OK',
    confirmText = 'OK',
    vibrate = [],
    playSound = "assets/audio/error-alert.flac",
    cancelText = 'Cancel',
    closeStyle,
    myWindow = ""
}) => {
    return new Promise(resolve => {
        const existingAlert = document.querySelector('.alert-wrapper');

        if (existingAlert) {
            existingAlert.remove();
        }
        var body;
        if (typeof myWindow != 'string') {
            body = myWindow.document.getElementById("container");
            if (body == null) {
                // fix for #177 message no longer shown due to change of template on WordPress.org
                //body = document.getElementById("wordpress-org");
                body = document.getElementsByClassName("gp-content")[0];
            }
        }
        else {
            const body = document.querySelector('body');
        }
        const scripts = document.getElementsByTagName("script");
        let src = "";

        for (let script of scripts) {
            if (script.src.includes("cute-alert.js")) {
                src = script.src.substring(0, script.src.lastIndexOf('/'));
            }
        }
        if (src === "") {
            // 13-08-2021 Modified the code below to be able to use it in manifest
            src = chrome.runtime.getURL('');
        }

        let btnTemplate = `

    <button class="alert-button ${type}-bg ${type}-btn">${buttonText}</button>
    `;

        if (type === 'question') {
            btnTemplate = `
      <div class="question-buttons">
        <button class="confirm-button ${type}-bg ${type}-btn">${confirmText}</button>
        <button class="cancel-button error-bg error-btn">${cancelText}</button>
      </div>
      `;
        }

        if (vibrate.length > 0) {
            navigator.vibrate(vibrate);
        }

        if (playSound !== null && type === "error") {
            if (Notification.permission !== "denied") {
                //   console.debug('permission:', Notification.permission)
                Notification.requestPermission((permission) => {
                    if (permission === "granted") {
                        //console.debug('granted:', permission)
                        let sound = new Audio(src + playSound);
                        const promise = sound.play();
                        //console.debug("sound:",promise)
                        if (promise !== undefined) {
                            promise.then(() => {
                                //console.debug("sound is played!")
                                sound = new Audio(src + playSound);
                                sound.muted = true;
                               // sound.play();
                            }).catch(error => {
                                // Autoplay was prevented.
                                //console.debug("sound is not allowed!!")
                            });
                        }
                        else {
                            console.debug("promise undefined")
                        }
                    };
                });
            }

        }

        const template = `
    <div class="alert-wrapper">
      <div class="alert-frame">
        ${img !== '' ? '<div class="alert-header ' + type + '-bg">' : '<div>'}
          <span class="alert-close ${closeStyle === 'circle'
                ? 'alert-close-circle'
                : 'alert-close-default'
            }">X</span>
          ${img !== '' ? '<img class="alert-img" src="' + chrome.runtime.getURL(img + '/' + type + '.svg') + '" />' : ''}
        </div>
        <div class="alert-body">
          <span class="alert-title">${title}</span>
          <span class="alert-message">${message}</span>
          ${btnTemplate}
        </div>
      </div>
    </div>
    `;

        body.insertAdjacentHTML('afterend', template);

        const alertWrapper = myWindow.document.querySelector('.alert-wrapper');
        const alertFrame = myWindow.document.querySelector('.alert-frame');
        const alertClose = myWindow.document.querySelector('.alert-close');

        if (type === 'question') {
            const confirmButton = myWindow.document.querySelector('.confirm-button');
            const cancelButton = myWindow.document.querySelector('.cancel-button');

            confirmButton.addEventListener('click', () => {
                alertWrapper.remove();
                resolve('confirm');
            });

            cancelButton.addEventListener('click', () => {
                alertWrapper.remove();
                resolve('cancel');
            });
        } else {
            const alertButton = myWindow.document.querySelector('.alert-button');

            alertButton.addEventListener('click', () => {
                alertWrapper.remove();
                resolve('ok');
            });
        }

        alertClose.addEventListener('click', () => {
            alertWrapper.remove();
            resolve('close');
        });

        /*     alertWrapper.addEventListener('click', () => {
              alertWrapper.remove();
              resolve();
            }); */

        alertFrame.addEventListener('click', e => {
            e.stopPropagation();
        });
    });
};

const cuteToast = ({ type, message, timer = 2000, vibrate = [], playSound = "assets/audio/error-alert.flac", img = "assets/images/icons", title = "", myWindow }) => {
    var body;
    return new Promise(resolve => {
        //console.debug("params:", type, message, timer, vibrate, playSound, img, title, myWindow);
        if (typeof myWindow == 'undefined') {
            body = document.querySelector('body');
        }
        else {

            body = myWindow.document.querySelector("#consistency");
        }
        const scripts = document.getElementsByTagName("script");
        let src = "";

        for (let script of scripts) {
            if (script.src.includes('cute-alert.js')) {
                src = script.src.substring(0, script.src.lastIndexOf('/'));
            }
        }
        if (src === "") {
            // 13-08-2021 Modified the code below to be able to use it in manifest
            src = chrome.runtime.getURL('');
        }
        if (typeof myWindow == "undefined") {
            templateContainer = document.getElementById('toast-container');
        }
        else {
            templateContainer = myWindow.getElementById('toast-container');
        }
        if (!templateContainer) {
            body.insertAdjacentHTML(
                'afterend',
                '<div class="toast-container"></div>',
            );
            if (typeof myWindow == "undefined") {
                templateContainer = document.querySelector('.toast-container');
            }
            else {
                templateContainer = myWindow.document.querySelector('.toast-container');
            }
        }

        const toastId = id();
        const templateContent = `
    <div class="toast-content ${type}-bg" id="${toastId}-toast-content">
      <div>
        <div class="toast-frame">
          <div class="toast-body">
            ${img !== '' ? '<img class="toast-body-img" src="' + chrome.runtime.getURL(img + '/' + type + '.svg') + '" />' : ''}
            <div class="toast-body-content">
              <span class="toast-title">${title}</span>
              <span class="toast-message">${message}</span>
            </div>
            <div class="toast-close" id="${toastId}-toast-close">X</div>
          </div>
        </div>
        ${img !== '' ? '<div class="toast-timer ' + type + '-timer"  style="animation: timer' + timer + 'ms linear;>' : ''}
      </div>
    </div>
    `;
        if (typeof myWindow == 'undefined') {
            toasts = document.querySelectorAll('.toast-content');
        }
        else {
             toasts = myWindow.querySelectorAll('.toast-content');
        }

        if (toasts.length) {
            toasts[0].insertAdjacentHTML('beforebegin', DOMPurify.sanitize(templateContent));
        } else {
            templateContainer.innerHTML = DOMPurify.sanitize(templateContent);
        }
        if (typeof myWindow == 'undefined') {
            toastContent = document.getElementById(`${toastId}-toast-content`);
       }
       else {
            toastContent = myWindow.getElementsByClassName("toast-content info-bg")[0];
       }

        if (vibrate.length > 0) {
            navigator.vibrate(vibrate);
        }

        if (playSound !== null) {
            let sound = new Audio(src + playSound);
           // sound.play();
        }
        setTimeout(() => {
            toastContent.remove();
            resolve();
        }, timer);
        if (typeof myWindow == 'undefined') {
            toastClose = document.getElementById(`${toastId}-toast-close`);
        }
        else {
            toastClose = myWindow.getElementsByClassName("toast-close")[0];
       }

        toastClose.addEventListener('click', () => {
            toastContent.remove();
            resolve();
        });
    });
};

const id = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};
