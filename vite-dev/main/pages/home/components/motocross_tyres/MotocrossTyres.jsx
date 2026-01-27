import Link from 'core/navigation/link';
import styles from './MotocrossTyres.module.less';

export default function HeroVideoCard() {
	const src =
		'https://player.vimeo.com/video/776139052?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1';

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.card}>
					<Link className={styles.content}  to="#">
						<div className={styles.heading}>
							Learn more about Motocross Tyres
						</div>
						<div className={styles.text}>
							Get an overview of different tyre categories, brands and
							accessories for tyre changing. Learn more about changing tyres
							with a step by step Changing Guide and find the right tyre for you
							with our Buying Guide.
						</div>
						<div className={styles.footer}>
							<Link className={styles.button} to="/article/events">
								Read more
							</Link>
						</div>
					</Link>

					<div className={styles.media}>
						<iframe
							className={styles.iframe}
							src={src}
							frameBorder="0"
							allow="autoplay; fullscreen; picture-in-picture"
							allowFullScreen
							title="Motocross tyres video"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
