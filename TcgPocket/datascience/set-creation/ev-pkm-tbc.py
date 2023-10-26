import pandas as pd

pkm_df = pd.read_csv('TcgPocket/datascience/data/av-sets/raw-data/pkm.csv')[:2000]

pkm_df_1 = pkm_df['card'][:400]
pkm_df_2 = pkm_df['card'][400:800]
pkm_df_3 = pkm_df['card'][800:1200]
pkm_df_4 = pkm_df['card'][1200:1600]
pkm_df_5 = pkm_df['card'][1600:2000]

pkm_df_1.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/1/pkm_unclassif_1.csv', index=False)
pkm_df_2.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/2/pkm_unclassif_2.csv', index=False)
pkm_df_3.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/3/pkm_unclassif_3.csv', index=False)
pkm_df_4.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/4/pkm_unclassif_4.csv', index=False)
pkm_df_5.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/5/pkm_unclassif_5.csv', index=False)
