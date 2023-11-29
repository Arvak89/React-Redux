import {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {useDeleteHeroMutation, useGetHeroesQuery} from "../../api/apiSlice";

const HeroesList = () => {

    const {
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery()

    const [deleteHero] = useDeleteHeroMutation()

    const activeFilter = useSelector(state => state.filters.activeFilter)

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice()

        if (activeFilter === 'all') {
            return filteredHeroes
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter)
        }
    }, [heroes, activeFilter])

    const onDelete = useCallback((id) => {

        deleteHero(id)
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <div
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </div>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <div
                    key={id}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </div>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <div component="ul">
            {elements}
        </div>
    )
}

export default HeroesList;