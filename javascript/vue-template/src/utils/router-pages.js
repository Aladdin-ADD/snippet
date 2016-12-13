import R from 'ramda';
import routes from '../routes.js';

const url2pair = (url) => {
    const getTitle = R.pipe(
        R.propEq('path'),
        R.filter(R.__, routes),
        R.head,
        R.path(['meta', 'title'])
    );
    return {
        path: url,
        title: getTitle(url),
    };
};
const format = R.map(R.ifElse(
    R.is(Array),
    (u) => [u[0], R.map(url2pair, u[1])],
    url2pair
));

const pages = format([
    '/index.html',
]);

export default pages;
