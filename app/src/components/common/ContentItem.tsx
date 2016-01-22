/**

    Блок одного контента в списке

 */

import * as React from 'react';
import * as infs from '../../interfaces/interfaces';
import Rating from '../common/Rating';


interface IProps {

    content: infs.Content
    key: number
}

export default class ContentItem extends React.Component<IProps, any> {

    render() {

        const {content, key} = this.props;

        const f = (content): any => {
            switch(content.type) {
                case 'article':
                    return <ContentArticle content={content} key={key}/>;
                default:
                    return <div />
            }
        };

        return (
            f(content)
        )
    }
}


class ContentArticle extends React.Component<IProps, any> {


    render() {

        const {content} = this.props;

        return (
            <article>
                <header>
                    <a href="#" className="usName">yaru</a>
                    <p>добавил опрос в

                        сообщество <a href={content.community.getUrl()}>Третье сообщество</a>

                        <mark>
                            <a href={content.getUrl()}>{content.getEditorTitle()}</a>
                        </mark>
                    </p>

                </header>
                <p>
                    {content.text}
                </p>

                <footer>
                    <Rating rating={content.rating} />
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




