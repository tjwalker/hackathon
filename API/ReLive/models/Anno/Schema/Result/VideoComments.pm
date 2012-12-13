use utf8;
package Anno::Schema::Result::VideoComments;

use strict;
use warnings;

use base 'DBIx::Class::Core';
__PACKAGE__->load_components("InflateColumn::DateTime");
__PACKAGE__->table("comment");
__PACKAGE__->add_columns(
    "user_id",
    {data_type => "char", is_nullable => 0, size => 255},
    "video_id",
    {data_type => "char", is_nullable => 0, size => 255},
    "comment",
    {data_type => "char", is_nullable => 0, size => 512},
    "time",
    {data_type => "datetime", is_nullable => 0},
);

__PACKAGE__->set_primary_key("user_id", "video_id");

__PACKAGE__->belongs_to( user => "Anno::Schema::Result::User", "user_id" );
__PACKAGE__->belongs_to( video => "Anno::Schema::Result::Video", "video_id" );


1;
