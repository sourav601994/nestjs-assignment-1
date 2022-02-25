import { Exclude } from 'class-transformer';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { IdType } from '../user.idtype.enum';

@Entity()
export class User {

  @Column({
    length: 200,
  })
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    length: 200,
  })
  name: string;

  @Column()
  @Generated('uuid')
  @Exclude({ toPlainOnly: true })
  uniqueId: string;

  @Column()
  idType: IdType;
}
