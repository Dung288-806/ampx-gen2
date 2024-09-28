import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
@Table({
    tableName: 'Users',
    timestamps: true, //  createdAt and updatedAt columns will be add automatically
})
export class Users extends Model<Users> {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    id: number;

    @Column({
        type: DataType.INTEGER,
    })
    merchantId: number;

    @Column({
        type: DataType.CHAR(255),
        allowNull: false,
        unique: true,
    })
    email: string;

    @Column({
        type: DataType.CHAR(255),
        allowNull: false,
    })
    firstName: string;

    @Column({
        type: DataType.CHAR(255),
        allowNull: false,
    })
    lastName: string;

    @Column({
        type: DataType.STRING,
    })
    avatar: string;

    @Column({
        type: DataType.ENUM('MALE', 'FEMALE', 'OTHER'),
    })
    gender: string;

    @Column({
        type: DataType.DATE,
    })
    dayOfBirth: string;

    @Column({
        type: DataType.CHAR(255),
    })
    referenceId: string;

    @Column({
        type: DataType.CHAR(255),
    })
    companyName: string;

    @Column({
        type: DataType.ENUM('ADMIN', 'MERCHANT', 'USER', 'HC'),
    })
    userType: string;

    @Column({
        type: DataType.CHAR(255),
    })
    title: string;

    @Column({
        type: DataType.CHAR(255),
    })
    description: string;

    @Column({
        type: DataType.CHAR(255),
    })
    address: string;

    @Column({
        type: DataType.INTEGER,
    })
    countryId: number;

    @Column({
        type: DataType.CHAR(255),
    })
    province: string;

    @Column({
        type: DataType.INTEGER,
    })
    state: number;

    @Column({
        type: DataType.INTEGER,
    })
    cityId: number;

    @Column({
        type: DataType.CHAR(255),
    })
    zipcode: string;

    @Column({
        type: DataType.CHAR(255),
        allowNull: false,
    })
    searchKeywords: string;

    @Column({
        type: DataType.CHAR(255),
        allowNull: false,
    })
    cognitoId: string;

    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
        allowNull: false,
        defaultValue: [],
    })
    roles: [number];

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    status: 1;

    @Column({
        type: DataType.CHAR(255),
    })
    phoneNumber: string;

    @Column({
        type: DataType.CHAR(255),
    })
    phoneCode: string;

    @Column({
        type: DataType.DATE,
    })
    lastLoginTime: string;

    @Column({
        type: DataType.CHAR(255),
    })
    reasonForDeactivation: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    deleted = false;

    @Column({
        type: DataType.CHAR(255),
    })
    language: string;

    @Column({
        type: DataType.FLOAT,
    })
    timezone: number;

    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
        allowNull: true,
    })
    teams?: number[];

    @Column({
        type: DataType.JSONB,
    })
    importProviders?: string;

    @Column({
        type: DataType.ARRAY(DataType.CHAR(255)),
        allowNull: false,
    })
    userTypes: string[];

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    inviterId?: number;

    missingAccount?: boolean;
    permission?: string[];
}
