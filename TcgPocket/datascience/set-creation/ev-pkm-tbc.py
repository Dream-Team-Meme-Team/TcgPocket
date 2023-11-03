import pandas as pd

pkm_df = pd.read_csv('TcgPocket/datascience/data/av-sets/raw-data/pkm.csv')[2000:4000]

pkm_df_6 = pkm_df['card'][:400]
pkm_df_7 = pkm_df['card'][400:800]
pkm_df_8 = pkm_df['card'][800:1200]
pkm_df_9 = pkm_df['card'][1200:1600]
pkm_df_10 = pkm_df['card'][1600:2000]

pkm_df_6.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/6/pkm_unclassif_6.csv', index=False)
pkm_df_7.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/7/pkm_unclassif_7.csv', index=False)
pkm_df_8.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/8/pkm_unclassif_8.csv', index=False)
pkm_df_9.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/9/pkm_unclassif_9.csv', index=False)
pkm_df_10.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/10/pkm_unclassif_10.csv', index=False)
