import pandas as pd

pkm_df = pd.read_csv('TcgPocket/datascience/data/av-sets/raw-data/pkm.csv')[2000:4000]

pkm_df_1 = pkm_df['card'][2000:2400]
pkm_df_2 = pkm_df['card'][2400:2800]
pkm_df_3 = pkm_df['card'][2800:3200]
pkm_df_4 = pkm_df['card'][3200:3600]
pkm_df_5 = pkm_df['card'][3600:4000]

pkm_df_1.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/6/pkm_unclassif_6.csv', index=False)
pkm_df_2.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/7/pkm_unclassif_7.csv', index=False)
pkm_df_3.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/8/pkm_unclassif_8.csv', index=False)
pkm_df_4.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/9/pkm_unclassif_9.csv', index=False)
pkm_df_5.to_csv('TcgPocket/datascience/data/ev-sets/to-be-classif/10/pkm_unclassif_10.csv', index=False)
