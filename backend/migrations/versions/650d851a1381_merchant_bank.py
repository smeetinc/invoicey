"""Merchant Bank

Revision ID: 650d851a1381
Revises: 
Create Date: 2023-11-25 20:36:54.496283

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '650d851a1381'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('merchant_bank_account',
    sa.Column('acct_num', sa.String(length=10), nullable=False),
    sa.Column('first_name', sa.String(length=120), nullable=False),
    sa.Column('last_name', sa.String(length=120), nullable=False),
    sa.Column('other_name', sa.String(length=120), nullable=True),
    sa.Column('bank_name', sa.String(length=80), nullable=False),
    sa.Column('bank_code', sa.Integer(), nullable=True),
    sa.Column('merchant_id', sa.Integer(), nullable=True),
    sa.Column('_id', sa.Integer(), nullable=False),
    sa.Column('is_deleted', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['merchant_id'], ['users._id'], ),
    sa.PrimaryKeyConstraint('_id'),
    sa.UniqueConstraint('_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('merchant_bank_account')
    # ### end Alembic commands ###
