import React, {ReactNode} from 'react';
import {car, CardProps, data} from "../constants/interfaces";

interface reviews {
    nickname: string,
    photo ?: string | null,
    stars: 'good' | 'normal' | 'bad',
}

interface subCardProps extends CardProps {
    reviews: reviews[],
    children: ReactNode
}


const Card = ({name, description, price, tags, reviews, children}: subCardProps) => {
    const data: data<car> = {
        status: 200,
        data: {
            name: 'Toyota',
            color:'black',
            mileage: 150
        }
    }
    return (
        <div>
            <h5>{name}</h5>
            <p>{description}</p>
            <span>{price}</span>
            <ul>
                {tags.map(elem => (
                    <li>{elem}</li>
                )) }
            </ul>
            <ul>
                {reviews.map(item => (
                    <li>{item.nickname} {item.photo} {item.stars}</li>
                ))}
            </ul>
            {children}
        </div>
    );
};

export default Card;