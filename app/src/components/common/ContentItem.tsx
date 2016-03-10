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

                case 'poll':
                    return <ContentPoll content={content} key={key}/>;

                case 'note':
                    return <ContentNote content={content} key={key}/>;

                case 'link':
                    return <ContentLink content={content} key={key}/>;

                case 'video':
                    return <ContentVideo content={content} key={key}/>;

                case 'photo':
                    return <ContentPhoto content={content} key={key}/>;

                default:
                    return <div>No Content Type {content.type}</div>
            }
        };

        return (
            f(content)
        )
    }
}

interface IUserProps {
    user: infs.User
}

class User extends React.Component<IUserProps, any> {

    render() {

        const {user} = this.props;

        return (
            <div className="user-l">
                <div className="userAva">
                    <a href={user.url}><img src={user.avatar['50x50']} /></a>
                </div>
                {user.is_online ? <span className="user-stat">Online</span>: ''}
            </div>
        )
    }
}


class ContentArticle extends React.Component<IProps, any> {

    type = 'статью';

    render() {

        const {content} = this.props;

        return (
            <article>
                <header>
                    <a href={content.user.url} className="usName">{content.user.fio_or_username_or_id}</a>
                    <p>{content.time_create} добавил {this.type}
                        <mark>
                            <a href={content.url}>{content.editor_title}</a>
                        </mark>
                    </p>

                </header>
                <p>
                    {content.text}
                </p>
                {content.image ?
                <a href={content.url}>
                    <img src={content.image} alt={content.editor_title} className="wall-img" />
                </a>
                :''}

                <footer>
                    <Rating content={content} />
                    <a href={content.url + '#comments'}><span>Комментировать</span> ({content.comments_count})</a>
                </footer>

                <User user={content.user} />

            </article>
        )
    }
}

class ContentPoll extends ContentArticle {
    type = 'опрос'
}

class ContentVideo extends ContentArticle {
    type = 'видео'
}


class ContentLink extends React.Component<IProps, any> {


    render() {

        const {content} = this.props;

        return (
            <article>
                <header>
                    <a href={content.user.url} className="usName">{content.user.fio_or_username_or_id}</a>
                    <p>{content.time_create} добавил ссылку
                        <mark>
                            <a href={content.source_link}>{content.editor_title}</a>
                        </mark>
                    </p>

                </header>
                <p>
                    {content.text}
                </p>

                <footer>
                    <Rating content={content} />
                    <a href={content.url + '#comments'}><span>Комментировать</span> ({content.comments_count})</a>
                </footer>

                <User user={content.user} />

            </article>
        )
    }

}

class ContentPhoto extends React.Component<IProps, any> {

    render() {

        const {content} = this.props;

        return (
            <article>
                <header>
                    <a href={content.user.url} className="usName">{content.user.fio_or_username_or_id}</a>
                    <p>{content.time_create} добавил фото</p>
                </header>
                <a>
                    <img src={content.image} className="wall-img"/>
                </a>
                <p>
                    {content.text}
                </p>

                <footer>
                    <Rating content={content} />
                    <a href={content.url + '#comments'}><span>Комментировать</span> ({content.comments_count})</a>
                    </footer>

                <User user={content.user} />

            </article>
        )
    }

}


class ContentNote extends React.Component<IProps, any> {


    render() {

        const {content} = this.props;

        return (
            <article>
                <header>
                    <a href={content.user.url} className="usName">{content.user.fio_or_username_or_id}</a>
                    <p>{content.time_create} добавил заметку</p>
                </header>
                <p>
                    {content.text}
                </p>

                <footer>
                    <Rating content={content} />
                    <a href={content.url + '#comments'}><span>Комментировать</span> ({content.comments_count})</a>
                </footer>

                <User user={content.user} />

            </article>
        )
    }

}




