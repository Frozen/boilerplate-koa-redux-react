import * as React from 'react';

interface IProps {
    infiniteLoadMore: () => void
    isActive(): boolean
    pause(): boolean
}


export default class InfiniteScrolling extends React.Component<IProps, any> {

    //propTypes = {
    //    infiniteLoadMore: React.PropTypes.func,
    //    infiniteIsLoading: React.PropTypes.bool
    //};

    private f: EventListener;
    private i: any;
    public refs: any;

    prevScrollValue: number = document.body.scrollTop;

    isMovingDown(currentScroll: number) {
        return currentScroll > this.prevScrollValue;
    }

    componentDidMount() {

        const {infiniteLoadMore, isActive, pause} = this.props;

        this.f = function(e) {

            var viewportOffset = this.refs.i.getBoundingClientRect();
            var scroll = document.body.scrollTop;

            if (scroll + 500 > viewportOffset.top && this.isMovingDown(scroll) &&
                infiniteLoadMore && isActive() && !pause()) {
                    // console.log("should load more");

                    infiniteLoadMore()
            }

            this.prevScrollValue = document.body.scrollTop;

        }.bind(this);


        window.addEventListener('scroll', this.f)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.f);
    }

    render() {
        return <i ref="i"/>
    }

}