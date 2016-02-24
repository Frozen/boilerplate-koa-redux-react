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
                    <img src={user.avatar['50x50']} alt={user.getFioOrUsernameOrId()} />
                </div>
                {user.isOnline() ? <span className="user-stat">Online</span>: ''}
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
                    <a href="#" className="usName">yaru</a>
                    <p>добавил {this.type}
                        <mark>
                            <a href={content.getUrl()}>{content.getEditorTitle()}</a>
                        </mark>
                    </p>

                </header>
                <p>
                    {content.text}
                </p>

                <footer>
                    <Rating content={content} />
                    <a href="/community/4/content/100#comments"><span>Комментировать</span> (0)</a>
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
                    <a href="#" className="usName">yaru</a>
                    <p>добавил ссылку
                        <mark>
                            <a href={content.getSourceLink()}>{content.getEditorTitle()}</a>
                        </mark>
                    </p>

                </header>
                <p>
                    {content.text}
                </p>

                <footer>
                    <Rating content={content} />
                    <a href="/community/4/content/100#comments"><span>Комментировать</span> (0)</a>
                </footer>

                <User user={content.user} />

            </article>
        )
    }

}


//class ContentPoll extends React.Component<IProps, any> {
//
//
//    render() {
//
//        const {content} = this.props;
//
//        return (
//            <article>
//                <header>
//                    <a href="#" className="usName">yaru</a>
//                    <p>добавил опрос в
//
//                        сообщество <a href={content.community.getUrl()}>Третье сообщество</a>
//
//                        <mark>
//                            <a href={content.getUrl()}>{content.getEditorTitle()}</a>
//                        </mark>
//                    </p>
//
//                </header>
//                <p>
//                    {content.text}
//                </p>
//
//                <footer>
//                    <Rating rating={content.rating} />
//                    <a href="/community/4/content/100#comments"><span>Комментировать</span> (0)</a>
//                </footer>
//
//                <User user={content.user} />
//
//            </article>
//        )
//    }
//
//}


class ContentNote extends React.Component<IProps, any> {


    render() {

        const {content} = this.props;

        return (
            <article>
                <header>
                    <a href={content.user.getUrl()} className="usName">{content.user.getFioOrUsernameOrId()}</a>
                    <p>добавил заметку</p>
                </header>
                <p>
                    {content.text}
                </p>

                <footer>
                    <Rating content={content} />
                    <a href="/community/4/content/100#comments"><span>Комментировать</span> (0)</a>
                </footer>

                <User user={content.user} />

            </article>
        )
    }

}




