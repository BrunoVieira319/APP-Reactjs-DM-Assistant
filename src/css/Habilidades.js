export default () => (
`
    .list-group-item-heading, .list-group-item-text {
        margin-bottom: 1px;
    }

    .list-group-item-heading {
        font-weight: bold;
    }

    .list-group-item {
        padding-top: 7px;
        padding-bottom: 7px;
    }

    .col-nome-habilidade {
        padding-right: 0;
    }

    .alert {
        margin: 10px 0px;
    }

    .adicionar-habilidade:hover {
        background-color: #d0ffd0;
        transition: 0.6s;
    }
    
    .adicionar-habilidade {
        background-color: #EEE;
        transition: 0.6s;
        cursor: pointer;
        padding-top: 11px;
        padding-bottom: 11px;
    }

    .div-shields {
        margin: auto auto;
        font-size: 34px;
    }

    .div-buttons {
        display: flex;
        justify-content: flex-end;
        padding-top: 8px;
        padding-bottom: 8px;
    }

    .div-buttons button {
        margin-left: 5px;
        font-size: 18px;
    }

    .add-icon {
        color: #080;
        width: 32px;
        height: 32px;
    }
`
)