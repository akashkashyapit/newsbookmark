import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removemark } from '../redux/reducer/news'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Cards({ item }) {
    const [expanded, setExpanded] = React.useState(false);
    const bm = useSelector((state) => state.news.news)
    const dispatch = useDispatch()
    const [bookmarks, setBookmarks] = React.useState(bm.includes(item.publishedAt))

    let url = "https://i.insider.com/52ed527cecad049a6d4ad89c?width=1200&format=jpeg"
    const handleExpandClick = () => {

        setExpanded(!expanded);
    };

    function bookmarkAdd() {
        setBookmarks(true)
        let date = item.publishedAt
        dispatch(addBookmark({ d: date }))
    }

    function removeBookmark() {
        setBookmarks(false)
        let date = item.publishedAt
        dispatch(removemark({ d: date }))
    }

    return (
        <Card sx={{ margin: 2, height: "auto" }}>

            <CardMedia
                component="img"
                height="194"
                image={item?.urlToImage ? item?.urlToImage : url}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h6" color="text.primary">
                    {item.title.slice(0, 40)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.description.slice(0, 65)}
                </Typography>

                <div style={{ marginTop: 9 }}>By: <span style={{ fontWeight: "bold", color: "#1976d2" }}>{item.author ? item.author.slice(0, 15) : "Unknown"}</span> | {item.publishedAt.slice(0, 10)}</div>
            </CardContent>
            <CardActions disableSpacing>

                {bookmarks ? (<IconButton aria-label="add to favorites" onClick={(el) => removeBookmark(el)}  >
                    <BookmarkIcon sx={{ color: "red" }} />
                </IconButton>) : (<IconButton aria-label="add to favorites" onClick={(el) => bookmarkAdd(el.publishedAt)} >
                    <BookmarkBorderIcon />
                </IconButton>)}


                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>

                    <Typography paragraph>
                        {item.description}
                    </Typography>

                </CardContent>
            </Collapse>
        </Card>
    );
}

