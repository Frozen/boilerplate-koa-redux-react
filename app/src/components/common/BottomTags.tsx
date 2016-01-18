/// <reference path="../../typings/tsd.t.ts" />
import * as React from 'react';


export default class BottomTags extends React.Component<any, any> {


    render() {
        return (
            <div className="block-list">
                <div className="list-div">
                    <h4>События и мнения</h4>
                    <ul>
                        <li><a href="/tag/12">Политика</a></li>
                        <li><a href="/tag/1">Общество</a></li>
                        <li><a href="/tag/211">Мир</a></li>
                        <li><a href="/tag/188">Оружие</a></li>
                        <li><a href="/tag/5208">Религия</a></li>
                        <li><a href="/tag/239">Наука</a></li>
                        <li><a href="/tag/208">Происшествия</a></li>
                        <li><a href="/tag/332">Спорт</a></li>
                    </ul>
                </div>
                <div className="list-div">
                    <h4>Деловой мир</h4>
                    <ul>
                        <li><a href="/tag/196">Экономика</a></li>
                        <li><a href="/tag/5151">Бизнес</a></li>
                        <li><a href="/tag/365">Деньги</a></li>
                        <li><a href="/tag/546">Недвижимость</a></li>
                        <li><a href="/tag/6126">Рынок труда</a></li>
                        <li><a href="/tag/9147">Потребительский рынок</a></li>
                        <li><a href="/tag/260">Нефть и газ</a></li>
                        <li><a href="/tag/324">Банки</a></li>
                    </ul>
                </div>
                <div className="list-div">
                    <h4>Частные интересы</h4>
                    <ul>
                        <li><a href="/tag/112">Культура</a></li>
                        <li><a href="/tag/245">Путешествия</a></li>
                        <li><a href="/tag/93">Технологии</a></li>
                        <li><a href="/tag/5253">Авто</a></li>
                        <li><a href="/tag/18">Еда</a></li>
                        <li><a href="/tag/7925">Личная жизнь</a></li>
                        <li><a href="/tag/19">Здоровье</a></li>
                        <li><a href="/tag/2432">Игры</a></li>
                    </ul>
                </div>
            </div>)
    }

}