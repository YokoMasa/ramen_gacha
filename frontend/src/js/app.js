import $ from 'jquery'

$(document).ready(() => {
    const button = $('#gachaButton')
    let count = 0
    console.log(button)
    button.on('click', (e) => {
        count++
        alert(`count: ${count}`)
    })
})