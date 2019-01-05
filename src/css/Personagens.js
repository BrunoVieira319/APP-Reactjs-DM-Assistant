export default () => (
`
    .row, h1 {
        font-family: 'Cantora One';
    }

    h1 {
        font-weight: bold;
        font-size: 50px;
    }

    .card-img {
        height: 250px;
        object-fit: cover;
        object-position: 50% 10%;
        transition: 0.6s;
    }

    .card-img:hover {
        transform: scale(1.17);
    }

    a {
        overflow: hidden;
    }

    .card-title {
        font-size: 24px;
    }

    .col-buttons {
        padding: 0;
    }

    .button-editar {
        padding: 2px 4px;
        background-color: #245;
        font-size: 24px;
    }

    .button-editar:hover {
        background-color: #123;
    }

    .button-descansar {
        padding: 2px 4px;
        background-color: #163;
        font-size: 24px;
        margin-top: 2px;
        border-color: #273;
    }

    .button-descansar:hover {
        background-color: #193;
        border-color: #2A3;
    }

    .barra-verde {
        background-color: #08968e
    }

    .barra-vermelha {
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-duration: 0.6s;
        animation-name: barra-de-vida-vermelha;
    }

    @keyframes barra-de-vida-vermelha {
        from {background-color: #600;}
        to {background-color: #f22;}
    }
`
)