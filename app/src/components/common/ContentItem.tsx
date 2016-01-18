/**

    Блок одного контента в списке

 */

import * as React from 'react';


export default class ContentItem extends React.Component<any, any> {


    //propTypes = {
    //    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    //        text: PropTypes.string.isRequired,
    //        completed: PropTypes.bool.isRequired
    //    }).isRequired).isRequired,
    //    visibilityFilter: PropTypes.oneOf([
    //        'SHOW_ALL',
    //        'SHOW_COMPLETED',
    //        'SHOW_ACTIVE'
    //    ]).isRequired
    //}
    //
    //propTypes = {
    //    //content: PropTypes.s
    //};


    render() {

        const {content, community, user} = this.props;

        return (
            <article>
                <header>
                    <a href="#" className="usName">yaru</a>
                    <p>добавил опрос в

                        сообщество <a href="/community/4">Третье сообщество</a>

                        <mark>
                            <a href="/community/4/content/100"></a>
                        </mark>
                    </p>

                </header>
                <p>
                    згжвафыщвг рвофвжафоы вдофыд аоыфджвао фывы
                </p>


                <footer>
                    <div className="plusMinus ng-scope">

                        <span className="ng-binding">0</span>



                        <span className="negative ng-binding">0</span>

                        <span className="positive ng-binding">0</span>
                    </div>
                    <a href="/community/4/content/100#comments"><span>Комментировать</span> (0)</a>
                </footer>

                <div className="user-l">
                    <div className="userAva">
                        <img src="http://new.maxpark.com/static/u/photo/4297852211/s.jpg" alt="" />
                        <div className="userHoverPopup">
                            <button className="close" title="Скрыть" />
                            <div className="userAva"><img src="/static/u/photo/1/s.jpg" alt="" /></div>
                            <div className="uDets">
                                <a href="#" className="usName">Василий стрельников</a>
                                <div className="user-location">
                                    <i className="icon-location" />
                                    <i className="icon-flag-ru" />
                                    <b>Россия</b>, Москва
                                </div>
                                <span className="friend">546 друзей</span>
                            </div>
                            <ul className="u-opts">
                                <li><a href="#"><i className="icon-add-dark" />Добавить в друзья</a></li>
                                <li><a href="#"><i className="icon-mess-dark" />Написать сообщение</a></li>
                                <li><a href="#"><i className="icon-pres-dark" />Сделать подарок</a></li>
                            </ul>
                        </div>
                    </div>
                    <span className="user-stat">Online</span>
                </div>

            </article>
        )
    }

}



