const conatinerMain = document.querySelector('.conatinerUnsubscribe')
const modalRequest = document.querySelector('.modalHidden')
const buttonModal = document.querySelector('.closeModal')
const spinnerModal = document.querySelector('.sppiner')

const unsubscribeCallback = (evento) => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(urlSearchParams.entries())
  const { token } = params
  if (!token) {
    activeModal('No se puede realizar la petición. Usuario no identificado!')
  }
  fechingUnsubcribe(token)
  evento.target.setAttribute('disabled', '')
}
document.getElementById('bajaACdatatech').addEventListener('click', unsubscribeCallback)
const API_AC = 'https://acdatatech.1.ie-1.fl0.io/client/unsubscribe'

const fechingUnsubcribe = (token) => {
  conatinerMain.classList.add('opacity-50')
  spinnerModal.classList.remove('hidden')
  fetch(API_AC, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      if (response.ok) {
        activeModal('Usuario eliminado!!')
      }
    })
    .catch((error) => {
      activeModal('No encontrado!!')
    })
}

const activeModal = (text) => {
  conatinerMain.classList.add('opacity-50')
  modalRequest.classList.remove('hidden')
  const sectionModal = document.querySelectorAll('section')
  sectionModal[0].children[0].innerText = text
  disabledSpinner()
}

buttonModal.addEventListener('click', () => {
  conatinerMain.classList.remove('opacity-50')
  modalRequest.classList.add('hidden')
  disabledSpinner()
})

const disabledSpinner = () => spinnerModal.classList.add('hidden')
