"""added acct_name col

Revision ID: 1476c67b24a6
Revises: ffaf8468f96d
Create Date: 2023-11-26 07:05:05.279433

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1476c67b24a6'
down_revision = 'ffaf8468f96d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('merchant_bank_account', schema=None) as batch_op:
        batch_op.add_column(sa.Column('acct_name', sa.String(length=150), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('merchant_bank_account', schema=None) as batch_op:
        batch_op.drop_column('acct_name')

    # ### end Alembic commands ###